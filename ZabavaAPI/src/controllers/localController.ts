import { Body, Get, Patch, Delete, Post, Route, Query } from 'tsoa';
import { LocalModel } from '../models/local';
import { JsonObject } from 'swagger-ui-express';

interface LocalRequestBody {
  nome: string;
  bairro: string;
  endereco: string;
  descricao: string;
  estado: string;
  rank: number;
}

interface LocalUpdateBody {
  id: string;
  nome?: string;
  bairro?: string;
  endereco?: string;
  descricao?: string;
  estado?: string;
  rank?: number;
}

@Route('api/local')
export default class LocalController {
  @Post('/create')
  public async create(@Body() body: LocalRequestBody): Promise<string> {
    const local = new LocalModel(body);

    try {
      await local.save();
      return 'OK';
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  @Get('/getAll')
  public async all(): Promise<JsonObject> {
    try {
      const locals = await LocalModel.find();
      return locals;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Patch('/update')
  public async update(@Body() body: LocalUpdateBody): Promise<JsonObject> {
    try {
      const updatedLocal = await LocalModel.findByIdAndUpdate(body.id, body, { new: true });
      return { result: updatedLocal };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Delete('/delete/:id')
  public async delete(id: string): Promise<JsonObject> {
    try {
      const local = await LocalModel.findByIdAndDelete(id);
      return { data: local };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get('/getById')
  public async getById(@Query() id: string): Promise<JsonObject> {
    try {
      const local = await LocalModel.findById(id);
      if (!local) {
        return { error: 'Local not found' };
      }
      return local;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
