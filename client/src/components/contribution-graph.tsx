import { useContributionData } from "@/hooks/use-github-data"; // Hook para dados de contribuição
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
// Importe Sparkles se precisar (não estava no seu código original que me passou)
import { Sparkles } from "lucide-react"; 

export default function ContributionGraph() {
  const { data: contributionData, isLoading, error } = useContributionData();
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  if (isLoading) {
    return (
      <section className="glass-effect rounded-xl p-6 floating-card">
        <div className="flex items-center justify-between mb-6">
          {/* Adicionando Sparkles aqui se você quiser o ícone no Skeleton */}
          <h3 className="text-xl font-semibold text-github-text flex items-center">
            <Sparkles className="mr-3 text-github-success" /> {/* Ícone para consistência */}
            <Skeleton className="h-6 w-48" />
          </h3>
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
          <Sparkles className="mr-3 text-github-success" /> {/* Ícone para consistência */}
          Contribution Activity
        </h3>
        <p className="text-red-500 mb-2">Failed to load contribution data.</p>
        <p className="text-github-muted text-sm">Detalhes: {error?.message || "Erro desconhecido"}</p>
        <p className="text-github-muted text-sm mt-1">Os dados de contribuição estão sendo simulados. Se persistir, pode ser um erro interno da simulação.</p>
      </section>
    );
  }

  const { total, contributions } = contributionData;
  
  // Group contributions by weeks
  // Esta lógica de agrupamento está correta para simular o layout do GitHub
  const weeks: Array<Array<typeof contributions[0]>> = [];
  let currentWeek: Array<typeof contributions[0]> = [];
  
  contributions.forEach((day, index) => {
    // getDay() retorna 0 para Domingo, 1 para Segunda, etc.
    // O GitHub geralmente começa a semana na Segunda-feira.
    // Ajuste aqui se quiser que a semana comece em Segunda:
    // const dayOfWeek = (new Date(day.date).getDay() + 6) % 7; // 0 for Monday, 6 for Sunday
    const dayOfWeek = new Date(day.date).getDay(); // Domingo = 0

    if (index === 0) {
      // Preencher dias vazios no início da primeira semana
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
  
  // Adicionar dias restantes à última semana
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }
    weeks.push(currentWeek);
  }

  // Cores dos níveis de contribuição
  // Estes são os valores em Tailwind. Se você quiser usar as cores
  // definidas em LANGUAGE_COLORS no use-github-data.ts, teria que
  // expandir LANGUAGE_COLORS para incluir 'Level0', 'Level1', etc.
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-github-border"; // Cinza claro, sem contribuições
      case 1: return "bg-blue-900/80";    // Azul escuro (baixo)
      case 2: return "bg-blue-700";       // Azul médio
      case 3: return "bg-blue-500";       // Azul um pouco mais claro
      case 4: return "bg-blue-400";       // Azul mais claro (alto)
      default: return "bg-github-border";
    }
  };

  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dayLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]; // Ajustei para PT-BR e comecei no Dom para day.getDay()

  return (
    <section className="glass-effect rounded-xl p-6 floating-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-github-text flex items-center">
          <Sparkles className="mr-3 text-github-success" /> {/* Ícone */}
          Contribution Activity
        </h3>
        <div className="flex items-center space-x-2 text-sm text-github-muted">
          <span>2024</span> {/* Este ano pode ser dinâmico se quiser */}
          <span>{total} contributions in the last year</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2"> {/* Adicionado pb-2 para evitar corte da barra de rolagem */}
        <div className="min-w-full relative">
          {/* Month labels */}
          <div className="flex mb-3">
            <div className="w-12"></div> {/* Espaço para day labels */}
            <div className="flex-1">
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
                {/* Lógica para exibir os meses */}
                {weeks.map((week, weekIndex) => {
                  const firstDayOfRenderedWeek = week.find(day => day.date); // Encontra o primeiro dia real da semana
                  if (!firstDayOfRenderedWeek) return <div key={weekIndex} className="h-4"></div>; // Renderiza espaço se a semana for toda vazia
                  
                  const date = new Date(firstDayOfRenderedWeek.date);
                  // Verifica se é a primeira semana do mês (ou se o mês mudou em relação à semana anterior)
                  // Para exibir o label do mês apenas uma vez por mês
                  const prevMonth = weekIndex > 0 ? new Date(weeks[weekIndex - 1][0].date).getMonth() : -1;
                  const currentMonth = date.getMonth();

                  return (
                    <div key={weekIndex} className="text-xs text-github-muted text-left h-4 flex items-center"
                         style={{ 
                             // Ajusta o posicionamento do mês para "alinhar" com a primeira coluna real do mês
                             gridColumnStart: currentMonth !== prevMonth ? 'span 1' : undefined // Basicamente, ocupa 1 coluna
                             // Você precisaria de lógica mais complexa para alinhar perfeitamente sobre a primeira coluna do MÊS
                             // Aqui, ele simplesmente aparece na coluna da PRIMEIRA SEMANA que pertence a esse mês.
                         }}>
                      {currentMonth !== prevMonth ? monthLabels[currentMonth] : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contribution grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col justify-between w-12 mr-3 py-1"> {/* Adicionado py-1 para ajuste visual */}
              {dayLabels.map((day, index) => (
                // Apenas exibe labels para Domingo, Terça e Quinta (índices 0, 2, 4) para evitar sobreposição
                <div key={day} className={`text-xs text-github-muted text-right pr-2 h-3 flex items-center justify-end ${
                    (index === 1 || index === 3 || index === 5) ? 'opacity-0' : '' // Oculta Seg, Qua, Sex
                }`}>
                  {day}
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
                        // O 'title' é o tooltip nativo do navegador.
                        // O 'hoveredDay' estado é para um tooltip customizado, que você implementou abaixo.
                        title={day.date ? `${day.count} contributions on ${new Date(day.date).toLocaleDateString()}` : ''}
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

          {/* Tooltip personalizado */}
          {/* Para um tooltip que "segue" o mouse ou se posiciona mais precisamente,
              você precisaria de uma biblioteca de tooltip (como o TooltipProvider que já tem)
              ou capturar as coordenadas do mouse.
              Atualmente, ele aparece na parte inferior do grid, centralizado.
              Se você tem um <TooltipProvider> em App.tsx, considere usar o componente <Tooltip> da shadcn/ui.
          */}
          {hoveredDay && (
            <div 
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-github-surface border border-github-border rounded-lg px-3 py-2 text-sm text-github-text shadow-lg z-10"
                // Remova o 'title' daqui para evitar tooltip duplo se o navegador também o mostrar
                // style={/* Pode adicionar top/left/transform dinâmicos aqui para seguir o mouse */}
            >
              <div className="font-semibold">{hoveredDay.count} contributions</div>
              <div className="text-github-muted">{new Date(hoveredDay.date).toLocaleDateString()}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}