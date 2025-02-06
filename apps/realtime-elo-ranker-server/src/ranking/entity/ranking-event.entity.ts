import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Player } from 'src/player/entity/player.entity';

@Entity()
export class RankingEvent {
  @PrimaryGeneratedColumn('uuid') // Génère un ID unique pour chaque événement
  id: string;

  @Column({ type: 'varchar', default: 'RankingUpdate' }) // Type d'événement
  type: string;

  @ManyToOne(() => Player, { nullable: false }) // Relation avec le joueur
  player: Player;

  @Column({ type: 'int' }) // Classement du joueur au moment de l'événement
  rank: number;
}
