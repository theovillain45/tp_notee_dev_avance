import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Player } from 'src/player/entity/player.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid') //  ID unique pour le match
  id: string;

  @ManyToOne(() => Player, { nullable: true }) //  Relation avec le gagnant
  winner: Player | null;

  @ManyToOne(() => Player, { nullable: true }) //  Relation avec le perdant
  loser: Player | null;

  @Column({ default: false }) //  Indique si c'est un match nul
  draw: boolean;
}
