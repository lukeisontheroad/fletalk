import { TestBed } from '@angular/core/testing'

import { DappService } from './dapp.service'

describe('DappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: DappService = TestBed.get(DappService)
    expect(service).toBeTruthy()
  })
})
