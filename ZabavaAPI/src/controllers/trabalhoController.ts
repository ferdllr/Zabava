import { Body, Get, Patch, Delete, Post, Route, Query } from 'tsoa';
import { TrabalhoModel } from '../models/trabalho';
import { JsonObject } from 'swagger-ui-express';

interface TrabalhoRequestBody {
  funcao: string;
  disponibilidade: string;
}

interface TrabalhoUpdateBody {
  id: string;
  funcao?: string;
  disponibilidade?: string;
}

@Route('api/trabalho')
export default class TrabalhoController {
  @Post('/create')
  public async create(@Body() body: TrabalhoRequestBody): Promise<string> {
    const trabalho = new TrabalhoModel(body);

    try {
      await trabalho.save();
      return 'OK';
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  @Get('/getAll')
  public async getAll(): Promise<JsonObject> {
    try {
      const trabalhos = await TrabalhoModel.find();
      return trabalhos;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Patch('/update')
  public async update(@Body() body: TrabalhoUpdateBody): Promise<JsonObject> {
    try {
      const updatedTrabalho = await TrabalhoModel.findByIdAndUpdate(body.id, body, { new: true });
      return { result: updatedTrabalho };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Delete('/delete/:id')
  public async delete(@Query() id: string): Promise<JsonObject> {
    try {
      const trabalho = await TrabalhoModel.findByIdAndDelete(id);
      return { data: trabalho };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get('/getById')
  public async getById(@Query() id: string): Promise<JsonObject> {
    try {
      const trabalho = await TrabalhoModel.findById(id);
      if (!trabalho) {
        return { error: 'Trabalho not found' };
      }
      return trabalho;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
