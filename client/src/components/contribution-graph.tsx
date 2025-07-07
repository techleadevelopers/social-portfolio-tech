import { useContributionData } from "@/hooks/use-github-data";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function ContributionGraph() {
  const { data: contributionData, isLoading, error } = useContributionData();
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  if (isLoading) {
    return (
      <section className="glass-effect rounded-xl p-6 floating-card">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </section>
    );
  }

  if (error || !contributionData) {
    return (
      <section className="glass-effect rounded-xl p-6 floating-card">
        <h3 className="text-xl font-semibold text-github-text mb-4">
          Contribution Activity
        </h3>
        <p className="text-github-muted">Failed to load contribution data</p>
      </section>
    );
  }

  const { total, contributions } = contributionData;
  
  // Group contributions by weeks
  const weeks: Array<Array<typeof contributions[0]>> = [];
  let currentWeek: Array<typeof contributions[0]> = [];
  
  contributions.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();
    
    if (index === 0) {
      // Fill empty days at the beginning of the first week
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: "", count: 0, level: 0 });
      }
    }
    
    currentWeek.push(day);
    
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  // Add remaining days to last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }
    weeks.push(currentWeek);
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-github-border";
      case 1: return "bg-blue-900/80";
      case 2: return "bg-blue-700";
      case 3: return "bg-blue-500";
      case 4: return "bg-blue-400";
      default: return "bg-github-border";
    }
  };

  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="glass-effect rounded-xl p-6 floating-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-github-text">
          Contribution Activity
        </h3>
        <div className="flex items-center space-x-2 text-sm text-github-muted">
          <span>2024</span>
          <span>{total} contributions in the last year</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full relative">
          {/* Month labels */}
          <div className="flex mb-3">
            <div className="w-12"></div> {/* Space for day labels - increased width */}
            <div className="flex-1">
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
                {weeks.map((week, weekIndex) => {
                  const firstDay = week.find(day => day.date);
                  if (!firstDay) return <div key={weekIndex} className="h-4"></div>;
                  
                  const date = new Date(firstDay.date);
                  const isFirstWeekOfMonth = date.getDate() <= 7;
                  
                  return (
                    <div key={weekIndex} className="text-xs text-github-muted text-center h-4 flex items-center justify-center">
                      {isFirstWeekOfMonth ? monthLabels[date.getMonth()] : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contribution grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col justify-between w-12 mr-3">
              {dayLabels.map((day, index) => (
                <div key={day} className={`text-xs text-github-muted text-right pr-2 h-3 flex items-center justify-end ${index % 2 === 0 ? '' : 'opacity-0'}`}>
                  {index % 2 === 0 ? day : ''}
                </div>
              ))}
            </div>

            {/* Contribution squares */}
            <div className="flex-1">
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-125 ${
                          day.date ? getLevelColor(day.level) : 'bg-transparent'
                        }`}
                        onMouseEnter={() => day.date && setHoveredDay({ date: day.date, count: day.count })}
                        onMouseLeave={() => setHoveredDay(null)}
                        title={day.date ? `${day.count} contributions on ${day.date}` : ''}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-github-muted">
            <span>Learn how we count contributions</span>
            <div className="flex items-center space-x-2">
              <span>Less</span>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Tooltip */}
          {hoveredDay && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-github-surface border border-github-border rounded-lg px-3 py-2 text-sm text-github-text shadow-lg z-10">
              <div className="font-semibold">{hoveredDay.count} contributions</div>
              <div className="text-github-muted">{new Date(hoveredDay.date).toLocaleDateString()}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
