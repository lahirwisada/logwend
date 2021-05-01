import { Injectable, Inject, BadGatewayException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IBaseService } from './IBase.service';

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T>{
	constructor(
    private readonly genericRepository: Repository<T>) {}

    create(entity: any): Promise<number>{
        try {
          return new Promise<number> ((resolve, reject) => {
              this.genericRepository.save(entity)
              .then(created=> resolve(created.id))
              .catch(err => reject(err))
              })
          }
          catch(error) {
              throw new BadGatewayException(error);
          }
    }

    getAll(): Promise<T[]> {
        try {
            return <Promise<T[]>>this.genericRepository.find();
          } catch (error) {
            throw new BadGatewayException(error);
        }
    }
    get(id: number): Promise<T> {
        try {
		  
        } catch (error) {
            throw new BadGatewayException(error);
        }
          return <Promise<T>>this.genericRepository.findOne(id);
    }
    update(id: number, entity: T): Promise<T> {

        try {
            return new Promise<any> ((resolve, reject) => {
                this.genericRepository.findOne(id)
                .then(responseGet => {
                    try {
                        if (responseGet == null) reject('Not existing')
                        let retrievedEntity: any = responseGet as any
                        let updatedData = Object.assign({}, retrievedEntity, entity);
                        this.genericRepository.save(updatedData)
                        .then(response => resolve(response))
                        .catch(err => reject(err))
                    }
                    catch(e) {
                            reject(e)
                    }
                })
                .catch(err => reject(err))
                }) 
        } catch (error) {
            throw new BadGatewayException(error);
        }
    }

    delete(id: number) {
        try {
            this.genericRepository.delete(id)
        } catch (error) {
            throw new BadGatewayException(error);
        }
    }

    theFunction(entity: T): Promise<number> {
        throw new Error('Method not implemented.');
    }
}