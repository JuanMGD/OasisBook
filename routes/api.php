<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassportAuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Inicio de sesión y registro de clientes
Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);
Route::post('getUserByToken', [PassportAuthController::class, 'getUserByToken']);

// Categorías
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/insertCategory', [CategoryController::class, 'store']);
Route::post('/updateCategory', [CategoryController::class, 'update']);
Route::post('/deleteCategory', [CategoryController::class, 'destroy']);

// Autores
Route::get('/authors', [AuthorController::class, 'index']);
Route::post('/insertAuthor', [AuthorController::class, 'store']);
Route::post('/updateAuthor', [AuthorController::class, 'update']);
Route::post('/deleteAuthor', [AuthorController::class, 'destroy']);

// Editoriales
Route::get('/publishers', [PublisherController::class, 'index']);
Route::post('/insertPublisher', [PublisherController::class, 'store']);
Route::post('/updatePublisher', [PublisherController::class, 'update']);
Route::post('/deletePublisher', [PublisherController::class, 'destroy']);

// Roles
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/insertRole', [RoleController::class, 'store']);
Route::post('/updateRole', [RoleController::class, 'update']);
Route::post('/deleteRole', [RoleController::class, 'destroy']);

// Usuarios
Route::get('/users', [UserController::class, 'index']);
Route::post('/showUserPurchases', [UserController::class, 'showUserPurchases']);
Route::post('/insertUser', [UserController::class, 'store']);
Route::post('/updateUser', [UserController::class, 'update']);
Route::post('/deleteUser', [UserController::class, 'destroy']);

// Libros
Route::get('/books', [BookController::class, 'index']);
Route::get('/showLatestBooks', [BookController::class, 'showLatestBooks']);
Route::post('/showBooksByCategory', [BookController::class, 'showBooksByCategory']);
Route::post('/showBook', [BookController::class, 'showBook']);
Route::post('/showBookSet', [BookController::class, 'showBookSet']);
Route::post('/insertBook', [BookController::class, 'store']);
Route::post('/updateBook', [BookController::class, 'update']);
Route::post('/deleteBook', [BookController::class, 'destroy']);

// Ventas
Route::get('/sales', [SaleController::class, 'index']);
Route::post('/insertSale', [SaleController::class, 'store']);

// Valoraciones
Route::post('/insertRating', [RatingController::class, 'store']);
Route::post('/updateRating', [RatingController::class, 'update']);

// Lista de deseos
Route::post('/wishlist', [WishlistController::class, 'index']);
Route::post('/insertWishlistItem', [WishlistController::class, 'store']);
Route::post('/deleteWishlistItem', [WishlistController::class, 'destroy']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware('auth:api')->group(function () {
    
// });