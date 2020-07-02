<?php
require_once 'Users.php';
require_once 'Expenses.php';
require_once 'UsersController.php';
require_once 'CategoryController.php';
require_once 'ExpensesController.php';
require_once 'models.php';
require_once 'category.php';

$category = new Category(1);
$message = CategoryController::deleteCategory($category);
print_r ($message);