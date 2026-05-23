const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Player = sequelize.define('Player', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fifa_version: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fifa_update: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    player_face_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    long_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    player_positions: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    club_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nationality_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    overall: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    potential: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value_eur: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wage_eur: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_cm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight_kg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    preferred_foot: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weak_foot: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    skill_moves: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    international_reputation: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    work_rate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    body_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pace: DataTypes.INTEGER,
    shooting: DataTypes.INTEGER,
    passing: DataTypes.INTEGER,
    dribbling: DataTypes.INTEGER,
    defending: DataTypes.INTEGER,
    physic: DataTypes.INTEGER,
  
    attacking_crossing: DataTypes.INTEGER,
    attacking_finishing: DataTypes.INTEGER,
    attacking_heading_accuracy: DataTypes.INTEGER,
    attacking_short_passing: DataTypes.INTEGER,
    attacking_volleys: DataTypes.INTEGER,
  
    skill_dribbling: DataTypes.INTEGER,
    skill_curve: DataTypes.INTEGER,
    skill_fk_accuracy: DataTypes.INTEGER,
    skill_long_passing: DataTypes.INTEGER,
    skill_ball_control: DataTypes.INTEGER,
  
    movement_acceleration: DataTypes.INTEGER,
    movement_sprint_speed: DataTypes.INTEGER,
    movement_agility: DataTypes.INTEGER,
    movement_reactions: DataTypes.INTEGER,
    movement_balance: DataTypes.INTEGER,
  
    power_shot_power: DataTypes.INTEGER,
    power_jumping: DataTypes.INTEGER,
    power_stamina: DataTypes.INTEGER,
    power_strength: DataTypes.INTEGER,
    power_long_shots: DataTypes.INTEGER,
  
    mentality_aggression: DataTypes.INTEGER,
    mentality_interceptions: DataTypes.INTEGER,
    mentality_positioning: DataTypes.INTEGER,
    mentality_vision: DataTypes.INTEGER,
    mentality_penalties: DataTypes.INTEGER,
    mentality_composure: DataTypes.INTEGER,
  
    defending_marking: DataTypes.INTEGER,
    defending_standing_tackle: DataTypes.INTEGER,
    defending_sliding_tackle: DataTypes.INTEGER,
  
    goalkeeping_diving: DataTypes.INTEGER,
    goalkeeping_handling: DataTypes.INTEGER,
    goalkeeping_kicking: DataTypes.INTEGER,
    goalkeeping_positioning: DataTypes.INTEGER,
    goalkeeping_reflexes: DataTypes.INTEGER,
    goalkeeping_speed: DataTypes.INTEGER,
  
    player_traits: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'players',
    timestamps: false
  });
  
module.exports = Player;