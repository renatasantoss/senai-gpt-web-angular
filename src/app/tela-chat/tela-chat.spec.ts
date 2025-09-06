import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaChat } from './tela-chat';

describe('TelaChat', () => {
  let component: TelaChat;
  let fixture: ComponentFixture<TelaChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
