import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useEffect, useState } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

interface Props {
    time: number;
}

function Timer(props: Props) {
    const l10n = useLocalize();

    const { time } = props;
    const [passed, setPassed] = useState(0);
    const left = time - passed;

    const leftDays = Math.floor(left / DAY);
    const leftHours = Math.floor((left - leftDays * DAY) / HOUR);
    const leftMinutes = Math.floor((left - leftDays * DAY - leftHours * HOUR) / MINUTE);
    const leftSeconds = left - leftDays * DAY - leftHours * HOUR - leftMinutes * MINUTE;

    const format = (value: number): string => (`0${value}`).substr(-2);

    useEffect(() => {
        setPassed(0);

        const interval = setInterval(() => {
            setPassed((prev) => Math.min(prev + 1, time));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <div className="timer">
            <div className="timer__part">
                <div className="timer__part-value timer__part-value--days">{l10n(format(leftDays))}</div>
                <div className="timer__part-label">
                    <FormattedMessage id="TEXT_TIMER_DAYS" />
                </div>
            </div>
            <div className="timer__dots" />
            <div className="timer__part">
                <div className="timer__part-value timer__part-value--hours">{l10n(format(leftHours))}</div>
                <div className="timer__part-label">
                    <FormattedMessage id="TEXT_TIMER_HOURS" />
                </div>
            </div>
            <div className="timer__dots" />
            <div className="timer__part">
                <div className="timer__part-value timer__part-value--minutes">{l10n(format(leftMinutes))}</div>
                <div className="timer__part-label">
                    <FormattedMessage id="TEXT_TIMER_MINUTES" />
                </div>
            </div>
            <div className="timer__dots" />
            <div className="timer__part">
                <div className="timer__part-value timer__part-value--seconds">{l10n(format(leftSeconds))}</div>
                <div className="timer__part-label">
                    <FormattedMessage id="TEXT_TIMER_SECONDS" />
                </div>
            </div>
        </div>
    );
}

export default Timer;
