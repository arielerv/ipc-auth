import { successMessages } from '@/constants';

export const getWorkloadResponse: (panels: unknown[], surveys: { date: Date }[]) => string = (panels, surveys) => {
    const dateWithoutHours = new Date();
    dateWithoutHours.setHours(0, 0, 0, 0);
    if (!panels) {
        const isTodaySurvey = surveys?.[0]?.date === dateWithoutHours;
        if (isTodaySurvey) {
            return successMessages.SUCCESS_DAY_COMPLETED;
        }
        return successMessages.SUCCESS_NO_LOAD_TODAY;
    } else {
        return successMessages.SUCCESS_PENDING_WORK;
    }
};
