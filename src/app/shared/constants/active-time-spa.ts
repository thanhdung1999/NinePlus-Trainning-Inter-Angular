interface HoursBooking {
    hours?: number;
    minutes?: number;
}
export interface Time {
    data?: Date;
    time?: string;
}
const start: HoursBooking[] = [
    {
        hours: 7,
        minutes: 0,
    },
    {
        hours: 7,
        minutes: 15,
    },
    {
        hours: 7,
        minutes: 30,
    },
    {
        hours: 8,
        minutes: 0,
    },
    {
        hours: 8,
        minutes: 15,
    },
    {
        hours: 8,
        minutes: 30,
    },
    {
        hours: 9,
        minutes: 0,
    },
    {
        hours: 9,
        minutes: 15,
    },
    {
        hours: 9,
        minutes: 30,
    },
    {
        hours: 9,
        minutes: 45,
    },
    {
        hours: 10,
        minutes: 0,
    },
    {
        hours: 10,
        minutes: 15,
    },
    {
        hours: 10,
        minutes: 30,
    },
    {
        hours: 10,
        minutes: 45,
    },
    {
        hours: 11,
        minutes: 0,
    },
    {
        hours: 11,
        minutes: 15,
    },
    {
        hours: 13,
        minutes: 0,
    },
    {
        hours: 13,
        minutes: 15,
    },
    {
        hours: 13,
        minutes: 30,
    },
    {
        hours: 13,
        minutes: 45,
    },
    {
        hours: 14,
        minutes: 0,
    },
    {
        hours: 14,
        minutes: 15,
    },
    {
        hours: 14,
        minutes: 30,
    },
    {
        hours: 14,
        minutes: 45,
    },
    {
        hours: 15,
        minutes: 0,
    },
    {
        hours: 15,
        minutes: 15,
    },
    {
        hours: 15,
        minutes: 30,
    },
    {
        hours: 15,
        minutes: 45,
    },
    {
        hours: 16,
        minutes: 0,
    },
    {
        hours: 16,
        minutes: 15,
    },
    {
        hours: 16,
        minutes: 30,
    },
    {
        hours: 16,
        minutes: 45,
    },
    {
        hours: 17,
        minutes: 0,
    },
    {
        hours: 19,
        minutes: 0,
    },
    {
        hours: 19,
        minutes: 15,
    },
    {
        hours: 19,
        minutes: 30,
    },
    {
        hours: 19,
        minutes: 45,
    },
    {
        hours: 20,
        minutes: 0,
    },
];

const end: HoursBooking[] = [
    {
        hours: 7,
        minutes: 30,
    },
    {
        hours: 8,
        minutes: 0,
    },
    {
        hours: 8,
        minutes: 15,
    },
    {
        hours: 8,
        minutes: 30,
    },
    {
        hours: 9,
        minutes: 0,
    },
    {
        hours: 9,
        minutes: 15,
    },
    {
        hours: 9,
        minutes: 30,
    },
    {
        hours: 9,
        minutes: 45,
    },
    {
        hours: 10,
        minutes: 0,
    },
    {
        hours: 10,
        minutes: 15,
    },
    {
        hours: 10,
        minutes: 30,
    },
    {
        hours: 10,
        minutes: 45,
    },
    {
        hours: 11,
        minutes: 0,
    },
    {
        hours: 11,
        minutes: 15,
    },
    {
        hours: 13,
        minutes: 0,
    },
    {
        hours: 13,
        minutes: 15,
    },
    {
        hours: 13,
        minutes: 30,
    },
    {
        hours: 13,
        minutes: 45,
    },
    {
        hours: 14,
        minutes: 0,
    },
    {
        hours: 14,
        minutes: 15,
    },
    {
        hours: 14,
        minutes: 30,
    },
    {
        hours: 14,
        minutes: 45,
    },
    {
        hours: 15,
        minutes: 0,
    },
    {
        hours: 15,
        minutes: 15,
    },
    {
        hours: 15,
        minutes: 30,
    },
    {
        hours: 15,
        minutes: 45,
    },
    {
        hours: 16,
        minutes: 0,
    },
    {
        hours: 16,
        minutes: 15,
    },
    {
        hours: 16,
        minutes: 30,
    },
    {
        hours: 16,
        minutes: 45,
    },
    {
        hours: 17,
        minutes: 0,
    },
    {
        hours: 19,
        minutes: 0,
    },
    {
        hours: 19,
        minutes: 15,
    },
    {
        hours: 19,
        minutes: 30,
    },
    {
        hours: 19,
        minutes: 45,
    },
    {
        hours: 20,
        minutes: 0,
    },
    {
        hours: 20,
        minutes: 15,
    },
    {
        hours: 20,
        minutes: 30,
    },
    {
        hours: 20,
        minutes: 45,
    },
    {
        hours: 21,
        minutes: 0,
    },
    {
        hours: 21,
        minutes: 15,
    },
    {
        hours: 21,
        minutes: 30,
    },
    {
        hours: 21,
        minutes: 45,
    },
    {
        hours: 22,
        minutes: 0,
    },
];
export class TimeActive {
    static startTime(): Time[] {
        const time: Time[] = [];
        start.forEach((item, index) => {
            let date = new Date();
            date.setHours(Number(item.hours));
            date.setMinutes(Number(item.minutes));
            let startTime: Time = {
                data: date,
                time: item.hours + 'h' + (item.minutes === 0 ? '00' : item.minutes),
            };
            time.push(startTime);
        });
        return time;
    }
    static endTime(): Time[] {
        const time: Time[] = [];
        end.forEach((item, index) => {
            let date = new Date();
            date.setHours(Number(item.hours));
            date.setMinutes(Number(item.minutes));
            let endTime = {
                data: date,
                time: item.hours + 'h' + (item.minutes === 0 ? '00' : item.minutes),
            };
            time.push(endTime);
        });
        return time;
    }
}
