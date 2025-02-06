import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn() // ✅ L'ID est une chaîne définie par l'utilisateur
  id: string;

  @Column({ default: 1000 }) // ✅ Score Elo par défaut
  rank: number;
}
