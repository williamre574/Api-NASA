import { Component, OnInit } from '@angular/core';
import { ServiceNasaService } from 'src/app/services/service-nasa.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private destroy$ = new Subject<void>();
  value: string;
  results: any[] = [];
  filteredResults: any[] = [];
  searchTerm: string = '';
  yearStart: number | null = null;
  yearEnd: number | null = null;
  includeImages: boolean = true;
  includeVideos: boolean = true;
  errorMessage: string = '';
  constructor(public NasaApi: ServiceNasaService) {this.value = ''}

  ngOnInit(): void {
    this.value = "";
    this.searchTerm = ""; // Valor predeterminado para la búsqueda inicial
    this.search();
  }
   // Completa el Subject para cancelar las suscripciones
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  validateYearInputs(): boolean {
    // Si uno de los campos de año está vacío y el otro tiene un valor, retorna false
    if ((this.yearStart && !this.yearEnd) || (!this.yearStart && this.yearEnd)) {
      this.errorMessage = 'Por favor, complete ambos campos de año o deje ambos vacíos.';
      return false;
    }
    this.errorMessage = ''; // Resetear mensaje de error si la validación pasa
    return true;
  }
  search(): void {
    if (this.searchTerm.trim() === '') {
      return; // Evita la búsqueda si el término está vacío
    }
    if (!this.validateYearInputs()) {
      return; // No realizar la búsqueda si la validación falla
    }
    let mediaTypes = '';
    if (this.includeImages) mediaTypes += 'image,';
    if (this.includeVideos) mediaTypes += 'video';
    mediaTypes = mediaTypes.endsWith(',') ? mediaTypes.slice(0, -1) : mediaTypes; 
    if (!this.includeImages && !this.includeVideos) {
      mediaTypes = '';
    }
    this.NasaApi.search(this.searchTerm, this.yearStart!, this.yearEnd!, mediaTypes)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        this.processResults(data.collection.items);
        this.results = data.collection.items;

        
        if (!this.includeImages && !this.includeVideos) {
          this.filteredResults = this.results; 
        } else {
          // Aplicar filtro en base a los checkboxes
          this.filteredResults = this.results.filter(item => {
            const mediaType = item.data[0].media_type;
            return (this.includeImages && mediaType === 'image') || (this.includeVideos && mediaType === 'video');
          });
        }

        console.log(this.filteredResults); 
      },
      error: (err) => {
        console.error('Error durante la llamada a la API', err);
      }
    });
  }
  loadPopular(): void {
    this.NasaApi.loadFromJson('../../../assets/popular.json')
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        console.log(data)
        this.processResults(data.collection.items);
        this.results = data.collection.items;
        this.filteredResults = this.results
        console.log('Datos populares cargados:', this.results);
      },
      error: (err) => {
        console.error('Error al cargar los datos populares', err);
      }
    });
  }

  processResults(results: any[]): void {
    this.results = results.map(item => {
      if (!item.data[0].keywords) {
        item.data[0].keywords = []; // Asegura que keywords siempre sea un array
      }
      return item;
    });
  }
  loadRecent(): void {
    this.NasaApi.loadFromJson('../../../assets/recent.json')
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        console.log(data)
        this.processResults(data.collection.items);
        this.results = data.collection.items;
        this.filteredResults = this.results
        console.log('Datos recientes cargados:', this.results);
      },
      error: (err) => {
        console.error('Error al cargar los datos recientes', err);
      }
    });
  }
}

