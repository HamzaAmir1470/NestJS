import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema.js';
import { Developer } from './schemas/developer.schema.js';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Developer.name) private developerModel: Model<Developer>,
  ) {}

  async seed(): Promise<{ dev1: Developer; dev2: Developer }> {
    const [projectA, projectB] = await Promise.all([
      this.projectModel.create({ title: 'Nest CRM A' }),
      this.projectModel.create({ title: 'MongoAnalytics B' }),
    ]);

    const [dev1, dev2] = await Promise.all([
      this.developerModel.create({
        name: 'Mehroz',
        projects: [projectA._id, projectB._id],
      }),
      this.developerModel.create({
        name: 'Hamza',
        projects: [projectA._id],
      }),
    ]);
    await Promise.all([
      this.projectModel.findByIdAndUpdate(projectA._id, {
        $set: { developers: [dev1._id, dev2._id] },
      }),
      this.projectModel.findByIdAndUpdate(projectB._id, {
        $set: { developers: [dev1._id] },
      }),
    ]);
    return { dev1, dev2 };
  }

  async getDevelopers(): Promise<Developer[]> {
    return this.developerModel.find().populate('projects').lean();
  }
  async getProjects(): Promise<Project[]> {
    return this.projectModel.find().populate('developers').lean();
  }
}
