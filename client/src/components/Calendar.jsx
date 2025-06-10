import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

export default function Calendar({ selectedDate, setSelectedDate }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    // const [selectedDate, setSelectedDate] = useState(new Date());

    const header = () => {
        return (
            <div className="flex justify-between items-center p-4 border-b border-[#D8D8D8]">
                <div className="text-gray-700 font-semibold">
                    <div className="text-sm"><i class="fa-solid fa-calendar"></i> {selectedDate ? format(selectedDate, 'EEE, MMM d') : ""}</div>
                </div>
            </div>
        );
    };

    const monthYearSelector = () => {
        return (
            <div className="flex justify-between items-center px-4 py-2">
                <span className="font-medium text-gray-700">{format(currentDate, 'LLLL yyyy')}</span>
                <button className='flex gap-3'>
                    <i onClick={() => setCurrentDate(subMonths(currentDate, 1))} class="fa-solid fa-angle-left cursor-pointer"></i>
                    <i onClick={() => setCurrentDate(addMonths(currentDate, 1))} class="fa-solid fa-angle-right cursor-pointer"></i>
                </button>
            </div>
        );
    };

    const daysOfWeek = () => {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return (
            <div className="grid grid-cols-7 text-xs text-center text-gray-500 px-4">
                {days.map((day, idx) => (
                    <div key={idx} className="py-1">{day}</div>
                ))}
            </div>
        );
    };

    const cells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                days.push(
                    <div
                        key={day}
                        className={`text-sm text-center py-2 cursor-pointer ${!isSameMonth(day, monthStart) ? 'text-gray-300' : 'text-gray-700'
                            } ${selectedDate && isSameDay(day, selectedDate) ? 'text-red-500 border border-red-500 rounded-full w-8 h-8 mx-auto' : ''}`}
                        onClick={() => setSelectedDate(cloneDay)}
                    >
                        {format(day, 'd')}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7 px-4" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div>{rows}</div>;
    };

    return (
        <div className="max-w-xs mx-auto  border rounded-xl border-[#D8D8D8] bg-white overflow-hidden">
            {header()}
            {monthYearSelector()}
            {daysOfWeek()}
            {cells()}
        </div>
    );
}
