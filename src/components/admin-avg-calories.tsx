"use client";
import React, { useState, useEffect } from 'react';
import { BarList, Card } from '@tremor/react';
import toast from "react-hot-toast";


function valueFormatter(number: number) {
  return `${Intl.NumberFormat('us').format(number).toString()}`;
}

export default function AvgCaloriesPerUser() {
  const [avgCaloriesPerUser, setAvgCaloriesPerUser] = useState<{ userId: string; avgCalories: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [extended, setExtended] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch('/api/get-avg-calories-per-user');
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setAvgCaloriesPerUser(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err) {
      setError('Error loading data');
      console.error(err);
    }
    setLoading(false);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="p-0 sm:mx-auto sm:max-w-lg">
      <div className="flex items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
        <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Average Calories per User
        </p>
        <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
          Calories
        </p>
      </div>
      <div className={`overflow-hidden p-6 ${extended ? '' : 'max-h-[260px]'}`}>
        <BarList
          data={avgCaloriesPerUser.map(({ userId, avgCalories }) => ({ name: userId, value: avgCalories }))}
          valueFormatter={valueFormatter}
        />
      </div>
      <div
        className={`flex justify-center ${
          extended ? 'px-6 pb-6' : 'absolute inset-x-0 bottom-0 rounded-b-tremor-default bg-gradient-to-t from-tremor-background to-transparent py-7 dark:from-dark-tremor-background'
        }`}
      >
        <button
          className="flex items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
          onClick={() => setExtended(!extended)}
        >
          {extended ? 'Show less' : 'Show more'}
        </button>
      </div>
    </Card>
  );
}