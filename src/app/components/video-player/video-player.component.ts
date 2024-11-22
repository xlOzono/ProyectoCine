import { Component } from '@angular/core';
import { FunAdminService } from 'src/app/fun-admin.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  constructor(public funcion: FunAdminService) {}

  openVideoDialog(): void {
    const url = prompt('Ingresa el enlace del video de YouTube:');
    if (url && this.isValidYouTubeUrl(url)) {
      this.funcion.addTrailer(url);
      alert('Enlace agregado exitosamente');
    } else if (url) {
      alert('Por favor, ingresa un enlace válido de YouTube.');
    }
  }

  private isValidYouTubeUrl(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  }
}
