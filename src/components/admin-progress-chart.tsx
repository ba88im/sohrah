"use client";
import React, { useEffect, useState } from 'react';
import { AreaChart, Card, List, ListItem } from '@tremor/react';

interface ChartDataPoint {
  date: string;
  value: number;
}

const statusColor = {
  Current: 'bg-blue-500',
  Past: 'bg-violet-500',
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function valueFormatter(number: any) {
  return `${Intl.NumberFormat('us').format(number)}`;
}

export default function AdminProgressChart() {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [summary, setSummary] = useState({ Current: 0, Past: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch('/api/get-week-chart-data');
      if (response.ok) {
        const { lastWeekData, thisWeekData } = await response.json();
  
        // Initialize an object to accumulate calories by date
        const caloriesByDate: Record<string, number> = {};
  
        // Aggregate calories for each entry by date
        thisWeekData.forEach((entry: any) => {
        console.log("Entry: ", entry);
          const dateKey = entry.createdAt.substring(0, 10); // Simplify date to YYYY-MM-DD
          const totalCalories = entry.calories.reduce((sum: any, cal: any) => sum + cal, 0); // Sum calories for the entry
          if (caloriesByDate[dateKey] as any) {
            caloriesByDate[dateKey] += totalCalories; // Add to existing date entry
          } else {
            caloriesByDate[dateKey] = totalCalories; // Create new date entry
          }
        });
  
        console.log('Calories by date:', caloriesByDate);
        // Convert the accumulated object into an array of chart data points
        const chartData = Object.entries(caloriesByDate).map(([date, value]) => ({
          date,
          value
        }));
  
        setData(chartData);
        setSummary({
          Current: thisWeekData.reduce((acc: any, cur: any) => acc + cur.calories.reduce((a: any, c: any) => a + c, 0), 0),
          Past: lastWeekData.reduce((acc: any, cur: any) => acc + cur.calories.reduce((a: any, c: any) => a + c, 0), 0),
        });
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err) {
      setError('Error loading data');
      console.error(err);
    }
    setLoading(false);
  }
    
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
    
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-auto">
        <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Entries metrics
        </h3>
        <AreaChart
          data={data.map(({ date, value }) => ({ date, Current: value, Past: 0 }))}
          index="date"
          categories={['Current', 'Past']}
          colors={['blue', 'violet']}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          showGradient={false}
          startEndOnly={true}
          className="mt-6 h-32"
        />
        <List className="mt-2">
          {Object.entries(summary).map(([key, value]) => (
            <ListItem key={key}>
              <div className="flex items-center space-x-2">
                <span
                  className={classNames(statusColor[key as keyof typeof statusColor], 'h-0.5 w-3')}
                  aria-hidden={true}
                />
                <span>{key}</span>
              </div>
              <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {valueFormatter(value)}
              </span>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}
