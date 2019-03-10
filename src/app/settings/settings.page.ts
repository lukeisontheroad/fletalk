import { Component } from '@angular/core'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  constructor(private barcodeScanner: BarcodeScanner) {}

  scan() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData)
      })
      .catch(err => {
        console.log('Error', err)
      })
  }
}
