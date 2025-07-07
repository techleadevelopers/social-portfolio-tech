Documentação do Projeto
Estrutura do Projeto
1. index.html
Descrição: Arquivo HTML principal que inicializa a aplicação React.
Elementos: Charset e viewport definidos para responsividade.
2. main.tsx
Descrição: Ponto de entrada da aplicação.
Responsabilidade: Renderiza o componente App.
3. App.tsx
Descrição: Componente principal que gerencia as rotas da aplicação.
4. home.tsx
Componentes:
GitHubHeader: Cabeçalho com navegação.
ProfileSidebar: Sidebar com informações do perfil.
PinnedRepositories: Lista de repositórios fixados.
ContributionGraph: Gráfico de contribuições.
RecentActivity: Atividades recentes do usuário.
5. profile-sidebar.tsx
Descrição: Exibe informações do perfil do usuário.
6. pinned-repositories.tsx
Descrição: Exibe repositórios fixados do usuário.
7. contribution-graph.tsx
Descrição: Exibe um gráfico de contribuições do GitHub.
8. recent-activity.tsx
Descrição: Exibe a atividade recente do usuário.
9. career.tsx
Descrição: Exibe a seção de carreira.
10. skills.tsx
Descrição: Mostra as habilidades técnicas do usuário.
11. projects.tsx
Descrição: Lista de projetos do usuário.
12. not-found.tsx
Descrição: Mostra uma mensagem quando a página não é encontrada.
Componentes UI
13. button.tsx
Descrição: Componente de botão reutilizável.
Props: Aceita variantes de estilo e tamanhos.
14. input.tsx
Descrição: Componente de entrada de texto.
15. textarea.tsx
Descrição: Componente de área de texto.
16. checkbox.tsx
Descrição: Componente de caixa de seleção.
17. radio-group.tsx
Descrição: Grupo de botões de opção.
18. dropdown-menu.tsx
Descrição: Componente de menu suspenso.
19. dialog.tsx
Descrição: Componente de diálogo modal.
20. tooltip.tsx
Descrição: Componente de tooltip.
21. table.tsx
Descrição: Componente de tabela.
22. carousel.tsx
Descrição: Componente de carrossel.
23. progress.tsx
Descrição: Componente de barra de progresso.
24. alert-dialog.tsx
Descrição: Diálogo de alerta.
25. alert.tsx
Descrição: Componente de alerta.
26. accordion.tsx
Descrição: Componente de acordeão.
27. tabs.tsx
Descrição: Componente de abas.
28. sidebar.tsx
Descrição: Componente de sidebar.
29. sheet.tsx
Descrição: Componente de folha deslizante.
30. separator.tsx
Descrição: Componente de separador.
31. scroll-area.tsx
Descrição: Componente de área de rolagem.
32. toggle.tsx
Descrição: Componente de alternância.
33. toggle-group.tsx
Descrição: Grupo de alternâncias.
34. skeleton.tsx
Descrição: Componente de esqueleto.
35. input-otp.tsx
Descrição: Componente para entrada OTP.
36. progress.tsx
Descrição: Componente de barra de progresso.
37. pagination.tsx
Descrição: Componente de paginação.
38. navigation-menu.tsx
Descrição: Componente de menu de navegação.
39. menubar.tsx
Descrição: Componente para um menu de barra.
40. label.tsx
Descrição: Componente de rótulo.
41. command.tsx
Descrição: Componente para comandos.
42. drawer.tsx
Descrição: Componente de painel deslizante.
43. resizable.tsx
Descrição: Componente para painéis redimensionáveis.
Variáveis CSS e Estilos
Variáveis CSS
Cores de Fundo e Texto:
--background: Cor de fundo principal.
--foreground: Cor de texto principal.
--muted: Cor de texto menos importante.
--primary: Cor principal.
--secondary: Cor secundária.
--destructive: Cor para ações destrutivas.
Estilos Tailwind
Estilos Gerais:
.glass-effect: Efeito de vidro com fundo semi-transparente e desfoque.
.morphism-card: Cartão com fundo gradiente e efeito de desfoque.
.floating-card: Cartão que flutua ao passar o mouse.
.repo-card: Cartão para repositórios com fundo claro e sombra.
Classes Customizadas
Animações:
.animate-float: Animação de flutuação.
.animate-glow: Animação de brilho.
.animate-slide-up: Animação de deslizamento para cima.
Tipos de Layout
Grid e Flex:
Utiliza flex e grid para organizar componentes responsivamente.
Classes como gap, justify-center, e items-center para espaçamento e alinhamento.
