import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLoggerLevel, NGXLogger, LoggerModule } from 'ngx-logger';

@NgModule({
  imports: [
    BrowserModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
  ],
  providers: [NGXLogger],
  bootstrap: []
})
export class AppModule {}
