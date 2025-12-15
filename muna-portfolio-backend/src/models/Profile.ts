import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface ProfileAttributes {
  id: number;
  name: string;
  bio: string | null;
  location: string | null;
  nationality: string | null;
  availability: string | null;
  dateOfBirth: Date | null;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  github: string | null;
  twitter: string | null;
  linkedin: string | null;
  expectedSalery: number | null; // keeping the spelling you requested
  ownACar: boolean;
  haveDrivingLicence: boolean;
  noticePeriod: string | null;
  immigrationStatus: string | null;
  references: string | null;
  willingToRelocate: boolean;
  languages: string | null; // e.g. "English, Arabic"
  skills: string | null; // e.g. "Node.js, TypeScript"
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileCreationAttributes
  extends Optional<
    ProfileAttributes,
    | "id"
    | "bio"
    | "location"
    | "nationality"
    | "availability"
    | "dateOfBirth"
    | "phoneNumber"
    | "address"
    | "github"
    | "twitter"
    | "linkedin"
    | "expectedSalery"
    | "noticePeriod"
    | "immigrationStatus"
    | "references"
    | "languages"
    | "skills"
    | "ownACar"
    | "haveDrivingLicence"
    | "willingToRelocate"
  > {}

export class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: number;
  public name!: string;
  public bio!: string | null;
  public location!: string | null;
  public nationality!: string | null;
  public availability!: string | null;
  public dateOfBirth!: Date | null;
  public email!: string;
  public phoneNumber!: string | null;
  public address!: string | null;
  public github!: string | null;
  public twitter!: string | null;
  public linkedin!: string | null;
  public expectedSalery!: number | null;
  public ownACar!: boolean;
  public haveDrivingLicence!: boolean;
  public noticePeriod!: string | null;
  public immigrationStatus!: string | null;
  public references!: string | null;
  public willingToRelocate!: boolean;
  public languages!: string | null;
  public skills!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    availability: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    github: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    expectedSalery: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    ownACar: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    haveDrivingLicence: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    noticePeriod: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    immigrationStatus: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    references: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    willingToRelocate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    languages: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "profiles",
  }
);
