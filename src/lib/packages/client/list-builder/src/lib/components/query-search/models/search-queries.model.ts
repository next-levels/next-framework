import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {Field, Model} from "@next-levels/types";

@Model('search_queries')
export class SearchQuery{
  @Field({ type: 'TEXT' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  created_at: Date;

  @Field({ type: 'TEXT' })
  name: string;

  @Field({ type: 'TEXT' })
  search_statement: string;

  @Field({ type: 'TEXT' })
  input_string: string;

  model_reference?: string;

  user: any;

  constructor() {
    this.created_at = new Date();
    this.search_statement = '';
    this.input_string = '';
    this.model_reference = '';
  }

}
