import { Body, Get, Patch, Delete, Post, Route, Query } from 'tsoa';
import { EventoModel } from '../models/evento';
import { JsonObject } from 'swagger-ui-express';

interface EventoRequestBody {
  nome: string;
  produtor: string;
  local: string;
  dataInicio: Date;
  dataFim: Date;
  funcionarios: string[];
}

interface EventoUpdateBody {
  id: string;
  nome: string;
  produtor?: string;
  local?: string;
  dataInicio?: Date;
  dataFim?: Date;
  funcionarios?: string[];
}

@Route('api/evento')
export default class EventoController {
  @Post('/create')
  public async create(@Body() body: EventoRequestBody): Promise<string> {
    const evento = new EventoModel(body);

    try {
      await evento.save();
      return 'OK';
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  @Get('/getAll')
  public async getAll(): Promise<JsonObject> {
    try {
      const eventos = await EventoModel.find();
      return eventos;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Patch('/update')
  public async update(@Body() body: EventoUpdateBody): Promise<JsonObject> {
    try {
      const updatedEvento = await EventoModel.findByIdAndUpdate(body.id, body, { new: true });
      return { result: updatedEvento };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Delete('/delete/:id')
  public async delete(@Query() id: string): Promise<JsonObject> {
    try {
      const evento = await EventoModel.findByIdAndDelete(id);
      return { data: evento };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get('/getById')
  public async getById(@Query() id: string): Promise<JsonObject> {
    try {
      const evento = await EventoModel.findById(id);
      if (!evento) {
        return { error: 'Evento not found' };
      }
      return evento;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
