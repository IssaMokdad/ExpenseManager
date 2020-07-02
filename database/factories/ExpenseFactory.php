<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Expense;
use Faker\Generator as Faker;
use App\Category;

$factory->define(Expense::class, function (Faker $faker) {
    return [
        'category_id' => factory(Category::class)->create(),
        'user_id' => 1,
        'amount'=>$faker->randomDigit,
        'Buying Date'=>$faker->dateTimeThisMonth(),
        'image'=>'1586905834.png'
    ];
});
