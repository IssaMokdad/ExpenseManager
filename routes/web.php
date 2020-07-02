<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::post('/logout', 'UserController@logout');
// Route::post('api/login', 'UserController@login')->name('APILogin');
Auth::routes();
Route::get('/', function(){
    return view('auth.login');
})->name('login');

Route::get('/getExpensesGroupedByCategory', 'CategoryController@getExpensesGroupedByCategory')->name('getExpensesGroupedByCategory')->middleware('auth');
Route::get('/getExpensesGroupedByCategoryOnSpecificDate', 'CategoryController@getExpensesGroupedByCategoryOnSpecificDate')->name('getExpensesGroupedByCategoryOnSpecificDate')->middleware('auth');
Route::post('/addexpense', 'ExpenseController@create')->name('addexpense')->middleware('auth');
Route::post('/editexpense', 'ExpenseController@edit')->name('addexpense')->middleware('auth');
Route::post('/deleteexpense', 'ExpenseController@delete')->name('deleteexpense')->middleware('auth');
Route::get('/getcategories', 'CategoryController@get')->name('getCategories')->middleware('auth');
Route::get('/getexpenses', 'ExpenseController@getExpenses')->name('getExpenses')->middleware('auth');
Route::post('/editcategory', 'CategoryController@edit')->name('editCategories')->middleware('auth');
Route::post('/deletecategory', 'CategoryController@delete')->name('deleteCategories')->middleware('auth');
Route::post('/addcategory', 'CategoryController@create')->name('addCategories')->middleware('auth');
Route::get('/home', 'HomeController@index')->name('home');

