import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventGateway } from './event.gateway';

@Module({
  imports: [EventEmitterModule.forRoot()], // EventEmitterModule est ici
  providers: [EventGateway], //  EventGateway déclaré ici
  exports: [EventGateway] //  Export pour être utilisé dans d'autres modules
})
export class EventsModule {}
