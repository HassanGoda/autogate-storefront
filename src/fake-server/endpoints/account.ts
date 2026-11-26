// application
import { delayResponse, error } from '~/fake-server/utils';
import { IEditProfileData } from '~/api/base';
import { IUser } from '~/interfaces/user';

export function accountSignIn(_email: string, _password: string): Promise<IUser> {
    return delayResponse(() => error('AUTH_UNAVAILABLE'));
}

export function accountSignUp(_email: string, _password: string): Promise<IUser> {
    return delayResponse(() => error('AUTH_UNAVAILABLE'));
}

export function accountSignOut(): Promise<void> {
    return Promise.resolve();
}

export function accountEditProfile(data: IEditProfileData): Promise<IUser> {
    const user: IUser = {
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: '//www.gravatar.com/avatar/bde30b7dd579b3c9773f80132523b4c3?d=mp&s=88',
    };

    return delayResponse(Promise.resolve(user));
}

export function accountChangePassword(oldPassword: string, newPassword: string): Promise<void> {
    if (newPassword.length < 6) {
        return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
    }

    return delayResponse(Promise.resolve());
}
