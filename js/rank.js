document.addEventListener('DOMContentLoaded', () => {
  // --- CONTROLE DE ABAS ---
  const stateTabs = document.querySelectorAll('.state-tab');
  const stateContents = document.querySelectorAll('.state-content');

  if (stateTabs.length > 0 && stateContents.length > 0) {
    stateTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetState = tab.getAttribute('data-state');

        stateTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        stateContents.forEach(content => {
          const contentState = content.getAttribute('data-state');

          if (contentState === targetState) {
            content.style.display = 'block';
            setTimeout(() => {
              content.classList.add('active');
            }, 20);
          } else {
            content.classList.remove('active');
            content.style.display = 'none';
          }
        });
      });
    });
  }

  // --- GUERREIROS DO ZODÍACO (SP - ORDEM DE OURO) ---
  const zodiacWarriors = [
    { name: "Richard", role: "Áries (Casa 1)", weapon: "Espada & Escudo" },
    { name: "Motta", role: "Touro (Casa 2)", weapon: "Espada & Escudo" },
    { name: "Wally Absoluto", role: "Gêmeos (Casa 3)", weapon: "Lança" },
    { name: "Sthephen J", role: "Câncer (Casa 4)", weapon: "Espada & Broquel" },
    { name: "Lc J", role: "Leão (Casa 5)", weapon: "Espada Montante" },
    { name: "Marcos", role: "Virgem (Casa 6)", weapon: "Espada & Escudo" },
    { name: "Brendo", role: "Libra (Casa 7)", weapon: "Espada & Escudo" },
    { name: "Deyvison", role: "Escorpião (Casa 8)", weapon: "Espada & Escudo" },
    { name: "Marcelo", role: "Sagitário (Casa 9)", weapon: "Espada & Escudo" },
    { name: "Jax", role: "Capricórnio (Casa 10)", weapon: "Espada & Escudo" },
    { name: "Raizen", role: "Aquário (Casa 11)", weapon: "Lança" },
    { name: "Chris J - Odisseu", role: "Serpentário (Casa 12)", weapon: "Espada & Escudo" }
  ];

  // --- GERADOR DINÂMICO DE FIGURINHAS ---
  const firstNames = ["Arthur", "Beatrice", "Gabriel", "Lucas", "Mariana", "Carlos", "Daniela", "Eduardo", "Roberto", "Felipe", "Gisele", "Thiago", "Henrique", "Juliana", "Bruno", "Isabela", "Leonardo", "João", "Amanda", "Vinícius", "Karen", "Gustavo", "Rodrigo", "Camila", "Marcos", "Nayara", "Victor", "Otávio", "Larissa", "Patrícia", "André", "Rafael", "Fernanda", "Diego", "Sophia", "Pedro", "Julio", "Matheus", "Beatriz", "Letícia", "Guilherme"];
  const lastNames = ["Silva", "Costa", "Souza", "Oliveira", "Santos", "Lima", "Rocha", "Guedes", "Nogueira", "Rezende", "Mello", "Alencar", "Ribeiro", "Pereira", "Ferreira", "Castro", "Alves", "Dias", "Teixeira", "Amazonas", "Pinheiro", "Gomes", "Barbosa", "Martins", "Azevedo", "Moreira", "Carvalho", "Cardoso", "Mendes", "Nascimento"];
  
  const weapons = {
    gold: ["Espada & Escudo", "Espada", "Espada Dual", "Lança"],
    silver: ["Espada & Escudo", "Espada", "Espada Dual", "Lança"],
    bronze: ["Espada & Escudo", "Espada", "Espada Dual", "Lança"],
  };

  const roles = {
    gold: "Combatente Ouro",
    silver: "Guerreiro Prata",
    bronze: "Recruta Bronze"
  };

  // Função para gerar uma lista determinística de 30 jogadores
  function generatePlayers(state, division) {
    const players = [];
    const stateSeed = state.charCodeAt(0) + (state.charCodeAt(1) || 0);
    const divSeed = division === 'gold' ? 10 : division === 'silver' ? 20 : 30;

    for (let i = 1; i <= 30; i++) {
      const firstIndex = (i * 7 + stateSeed * 3 + divSeed * 2) % firstNames.length;
      const lastIndex = (i * 13 + stateSeed * 5 + divSeed * 4) % lastNames.length;
      const weaponIndex = (i + stateSeed + divSeed) % weapons[division].length;

      players.push({
        name: `${firstNames[firstIndex]} ${lastNames[lastIndex]}`,
        role: roles[division],
        weapon: weapons[division][weaponIndex]
      });
    }
    return players;
  }

  // Renderizar os jogadores nos respectivos containers
  const states = ['rj', 'sp', 'mg', 'df', 'am', 'es', 'al', 'ba'];
  const divisions = ['gold', 'silver', 'bronze'];
  const svgTemplate = `<svg viewBox="0 0 100 100"><use href="#sticker-avatar-svg"/></svg>`;

  states.forEach(state => {
    divisions.forEach(div => {
      const containerId = `${state}-${div}-list`;
      const container = document.getElementById(containerId);

      if (container) {
        let players = [];

        // Regra especial: Ordem de Ouro do Rio de Janeiro (RJ) usa os 12 Guerreiros do Zodíaco
        if (state === 'rj' && div === 'gold') {
          players = zodiacWarriors;
        } else {
          players = generatePlayers(state, div);
        }

        let htmlContent = '';

        players.forEach(player => {
          const colorStyle = div === 'gold' ? 'var(--color-gold)' : div === 'silver' ? 'var(--color-silver)' : '#cd7f32';
          htmlContent += `
            <div class="sticker-card sticker-${div}">
              <div class="sticker-photo" style="color: ${colorStyle};">
                ${svgTemplate}
              </div>
              <div class="sticker-info">
                <div class="sticker-name">${player.name}</div>
                <div class="sticker-role">${player.role}</div>
                <div class="sticker-weapon">${player.weapon}</div>
              </div>
            </div>
          `;
        });

        container.innerHTML = htmlContent;
      }
    });
  });
});
