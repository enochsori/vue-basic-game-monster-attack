const handleGetRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      battleLog: [],
    };
  },
  watch: {
    monsterHealth() {
      if (this.monsterHealth <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        this.winner = 'player';
      }
    },
    playerHealth() {
      if (this.monsterHealth <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        this.winner = 'monster';
      }
    },
  },
  computed: {
    handleDisplayMonsterHealth() {
      return { width: this.monsterHealth + '%' };
    },
    handleDisplayPlayerHealth() {
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    handleAddBattleLog(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
    handleAttackToMonster() {
      this.currentRound++;
      const damage = handleGetRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.handleAttackToPlayer();
      this.handleAddBattleLog('Player', 'Attack', damage);
    },
    handleAttackToPlayer() {
      const damage = handleGetRandomValue(8, 15);
      this.playerHealth -= damage;
      this.handleAddBattleLog('Monster', 'Attack', damage);
    },
    handleSpecialAttack() {
      this.currentRound++;
      const damage = handleGetRandomValue(10, 17);
      this.monsterHealth -= damage;
      this.handleAttackToPlayer();
      this.handleAddBattleLog('Player', 'Special attack', damage);
    },
    handleHealPlayerHealth() {
      this.currentRound++;
      const healing = handleGetRandomValue(5, 12);
      if (this.playerHealth + healing < 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healing;
      }

      this.handleAttackToPlayer();
      this.handleAddBattleLog('Player', 'heal', healing);
    },
    handleSurrender() {
      this.playerHealth = 0;
      this.winner = 'monster';
      this.handleAddBattleLog('Player', 'surrender', 'Game Over');
    },

    handleReStart() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.battleLog = [];
    },
  },
});

app.mount('#game');
