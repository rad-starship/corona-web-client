import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LOCAL_STORAGE } from 'ngx-webstorage-service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const storageStub = {
    get: jasmine.createSpy('get').and.returnValue([]),
    set: jasmine.createSpy('set')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: LOCAL_STORAGE,
          useValue: storageStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('creates the root component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('defaults the username when storage is empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.userName).toBe('unknown');
  });
});
