// application
import { IReview } from '~/interfaces/review';
import { makeIdGenerator } from '~/fake-server/utils';

export const getNextReviewId = makeIdGenerator();

export const reviews: IReview[] = [];
