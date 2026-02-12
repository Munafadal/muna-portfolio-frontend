import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  tech: string; // Comma-separated or JSON string of technologies
  highlight: string | null; // e.g., "Frontend · UI/UX", "Data · APIs"
  url: string | null; // Project URL/link
  githubUrl: string | null; // GitHub repository URL
  imageUrl: string | null; // Project image/screenshot URL
  featured: boolean; // Whether to show on homepage
  order: number; // Display order
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectCreationAttributes
  extends Optional<
    ProjectAttributes,
    | "id"
    | "highlight"
    | "url"
    | "githubUrl"
    | "imageUrl"
    | "featured"
    | "order"
  > {}

export class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public tech!: string;
  public highlight!: string | null;
  public url!: string | null;
  public githubUrl!: string | null;
  public imageUrl!: string | null;
  public featured!: boolean;
  public order!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tech: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Comma-separated list of technologies",
    },
    highlight: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    githubUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "projects",
  }
);
