import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ChannelsOverviewPage } from './channels-overview.page'

describe('ChannelsOverviewPage', () => {
  let component: ChannelsOverviewPage
  let fixture: ComponentFixture<ChannelsOverviewPage>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelsOverviewPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsOverviewPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
