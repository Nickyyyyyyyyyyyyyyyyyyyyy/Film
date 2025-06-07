import { movies, type Movie, type InsertMovie } from "@shared/schema";

export interface IStorage {
  getMovies(): Promise<Movie[]>;
  getMovie(id: number): Promise<Movie | undefined>;
  getFeaturedMovie(): Promise<Movie | undefined>;
  getMoviesByCategory(category: string): Promise<Movie[]>;
  searchMovies(query: string): Promise<Movie[]>;
  createMovie(movie: InsertMovie): Promise<Movie>;
}

export class MemStorage implements IStorage {
  private movies: Map<number, Movie>;
  private currentId: number;

  constructor() {
    this.movies = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    const seedMovies: InsertMovie[] = [
      {
        title: "Quantum Heist",
        description: "In a world where reality bends to quantum mechanics, a master thief must pull off the impossible heist to save humanity from digital collapse.",
        synopsis: "In a world where reality bends to quantum mechanics, master thief Alex Chen must assemble a team of specialists to pull off the impossible heist. Their target: a quantum computer that holds the key to preventing humanity's digital collapse. With time running out and every decision creating new timelines, Alex must navigate through parallel realities while staying one step ahead of a mysterious organization that seems to know their every move.",
        year: 2024,
        duration: "2h 18m",
        rating: 8.7,
        genre: "Action",
        genres: "Action, Sci-Fi, Thriller",
        director: "Elena Vasquez",
        cast: ["Sarah Chen", "Marcus Rodriguez", "David Kim", "Elena Volkov"],
        releaseDate: "March 15, 2024",
        language: "English",
        country: "USA",
        posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://pixabay.com/get/g89e40cd9ec20ec21b9aa04fea31849d2abe33805376c1ffb32c218975a498bac79cd2a442bb7ff006eb1e7452c9bcfe040c66fb1205d2ead416837e6f2ae98c3_1280.jpg",
        videoUrl: "https://pixabay.com/get/g20eb193c6682caa6617978e09e5494e2d8743fcf63e0034f82851b6e53d11f28f46fc924320f651510e714c49cdbe42413c86a8186842970f1974dbb19020755_1280.jpg",
        featured: 1,
      },
      {
        title: "Shadow Striker",
        description: "A superhero vigilante fights against corruption in the city's underworld.",
        synopsis: "When detective Sarah Cross witnesses her partner's murder by corrupt officials, she adopts the identity of Shadow Striker to bring justice to a city consumed by darkness. Using advanced technology and martial arts mastery, she wages a one-woman war against organized crime.",
        year: 2024,
        duration: "1h 55m",
        rating: 8.2,
        genre: "Action",
        genres: "Action, Crime, Thriller",
        director: "Michael Chen",
        cast: ["Emma Stone", "Ryan Gosling", "Oscar Isaac", "Lupita Nyong'o"],
        releaseDate: "January 12, 2024",
        language: "English",
        country: "USA",
        posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: 0,
      },
      {
        title: "Love in Paris",
        description: "A romantic story set in the beautiful streets of Paris.",
        synopsis: "American architect Maya travels to Paris to renovate a historic hotel and finds herself falling for the passionate French chef who runs the hotel's restaurant. Their cultural differences and past heartbreaks threaten to keep them apart.",
        year: 2024,
        duration: "1h 42m",
        rating: 7.8,
        genre: "Romance",
        genres: "Romance, Drama, Comedy",
        director: "Sophie Marceau",
        cast: ["Zendaya", "Timothée Chalamet", "Marion Cotillard", "Jean Dujardin"],
        releaseDate: "February 14, 2024",
        language: "English",
        country: "France",
        posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: 0,
      },
      {
        title: "Cosmic Dawn",
        description: "Humanity's first contact with alien civilization changes everything.",
        synopsis: "When mysterious signals from deep space are decoded, Dr. Elena Vasquez leads the first mission to make contact with an alien civilization. What they discover challenges everything humanity thought they knew about their place in the universe.",
        year: 2024,
        duration: "2h 35m",
        rating: 9.1,
        genre: "Sci-Fi",
        genres: "Sci-Fi, Drama, Adventure",
        director: "Denis Villeneuve",
        cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker", "Michael Shannon"],
        releaseDate: "May 3, 2024",
        language: "English",
        country: "USA",
        posterUrl: "https://pixabay.com/get/g1941a57bb761c16ead7bebc6f351a58989137c35971c8a03dae7b67a495ec2b2b37b6fd02b23d91bc4f8a8cc6a044850e39e9131ece025b1f274da33c5e678cd_1280.jpg",
        backdropUrl: "https://pixabay.com/get/g1941a57bb761c16ead7bebc6f351a58989137c35971c8a03dae7b67a495ec2b2b37b6fd02b23d91bc4f8a8cc6a044850e39e9131ece025b1f274da33c5e678cd_1280.jpg",
        featured: 0,
      },
      {
        title: "Midnight Terror",
        description: "A psychological horror thriller that will keep you on the edge.",
        synopsis: "When a family moves into an isolated farmhouse, they discover that the previous owners left behind more than just furniture. As supernatural events escalate, they must uncover the dark history of their new home before it consumes them.",
        year: 2024,
        duration: "1h 48m",
        rating: 7.5,
        genre: "Horror",
        genres: "Horror, Thriller, Mystery",
        director: "Jordan Peele",
        cast: ["Lupita Nyong'o", "Winston Duke", "Elisabeth Moss", "Tim Heidecker"],
        releaseDate: "October 31, 2024",
        language: "English",
        country: "USA",
        posterUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: 0,
      },
      {
        title: "Summer Laughs",
        description: "A hilarious comedy about friendship and second chances.",
        synopsis: "Three childhood friends reunite for a summer road trip to their hometown, but their nostalgic journey turns into a series of hilarious misadventures when they accidentally become involved in a case of mistaken identity.",
        year: 2024,
        duration: "1h 35m",
        rating: 8.4,
        genre: "Comedy",
        genres: "Comedy, Adventure, Friendship",
        director: "Judd Apatow",
        cast: ["Seth Rogen", "Jonah Hill", "Michael Cera", "Christopher Mintz-Plasse"],
        releaseDate: "June 21, 2024",
        language: "English",
        country: "USA",
        posterUrl: "https://pixabay.com/get/g152449833cc591926ba33bb068c3f68c23b8ee815edc7858267f9433fb2aa8e385c84d1c4cc0f765fac0d9841452c3f0658596a948112044a6c1aa5a56227e48_1280.jpg",
        backdropUrl: "https://pixabay.com/get/g152449833cc591926ba33bb068c3f68c23b8ee815edc7858267f9433fb2aa8e385c84d1c4cc0f765fac0d9841452c3f0658596a948112044a6c1aa5a56227e48_1280.jpg",
        featured: 0,
      },
      {
        title: "Mountain Quest",
        description: "An epic adventure through treacherous mountain terrain.",
        synopsis: "Professional climber Jake Morrison leads a rescue mission to save a stranded research team in the Himalayas. Battling extreme weather and dangerous terrain, the team must overcome their personal demons to complete the impossible rescue.",
        year: 2023,
        duration: "2h 8m",
        rating: 8.9,
        genre: "Adventure",
        genres: "Adventure, Drama, Action",
        director: "Ron Howard",
        cast: ["Chris Hemsworth", "Jake Gyllenhaal", "Keira Knightley", "Josh Brolin"],
        releaseDate: "September 15, 2023",
        language: "English",
        country: "USA",
        posterUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: 0,
      },
      {
        title: "Night Runner",
        description: "A former detective turned private investigator uncovers a conspiracy.",
        synopsis: "A former detective turned private investigator must solve a series of mysterious disappearances that lead to a conspiracy spanning decades. As he digs deeper, he realizes that his own past is connected to the case in ways he never imagined.",
        year: 2024,
        duration: "2h 12m",
        rating: 8.6,
        genre: "Thriller",
        genres: "Thriller, Mystery, Crime",
        director: "David Fincher",
        cast: ["Jake Gyllenhaal", "Rosamund Pike", "Oscar Isaac", "Tilda Swinton"],
        releaseDate: "April 5, 2024",
        language: "English",
        country: "USA",
        posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: 0,
      },
    ];

    seedMovies.forEach(movie => this.createMovie(movie));
  }

  async getMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values());
  }

  async getMovie(id: number): Promise<Movie | undefined> {
    return this.movies.get(id);
  }

  async getFeaturedMovie(): Promise<Movie | undefined> {
    return Array.from(this.movies.values()).find(movie => movie.featured === 1);
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    if (category === "all") {
      return this.getMovies();
    }
    
    return Array.from(this.movies.values()).filter(movie => 
      movie.genre.toLowerCase() === category.toLowerCase() ||
      movie.genres.toLowerCase().includes(category.toLowerCase())
    );
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.movies.values()).filter(movie =>
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.description.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm) ||
      movie.director.toLowerCase().includes(searchTerm) ||
      movie.cast.some(actor => actor.toLowerCase().includes(searchTerm))
    );
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const id = this.currentId++;
    const movie: Movie = { ...insertMovie, id };
    this.movies.set(id, movie);
    return movie;
  }
}

export const storage = new MemStorage();
