<?php

namespace App\Http\Controllers;

use App\Expense;
use Auth;
use Illuminate\Http\Request;
use \DB;
use \Validator;

class ExpenseController extends Controller
{

    public function create(Request $request)
    {
        if ($request->hasFile('image')) {
            $data = array('category_id' => $request->input('category_id'), 'image' => $request->file('image'), 'Date' => $request->input('Date'), 'amount' => $request->input('amount'));
            $validator = Validator::make($data, [
                'amount' => ['required', 'numeric'],
                'Date' => ['date', 'required'],
                'category_id' => ['required', 'integer'],
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->messages(), 419);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . "." . $extension;
            $file->move('uploads/', $filename);
            Expense::create([
                'user_id' => Auth::id(),
                'amount' => $request->input('amount'),
                'Buying Date' => $request->input('Date'),
                'category_id' => $request->input('category_id'),
                'image' => $filename,
            ]);

            return response()->json(['success' => 'success']);

        } else {
            $data = array('category_id' => $request->input('category_id'), 'Date' => $request->input('Date'), 'amount' => $request->input('amount'));
            $validator = Validator::make($data, [
                'amount' => ['required', 'numeric'],
                'Date' => ['date', 'required'],
                'category_id' => ['required', 'integer'],
            ]);

            if ($validator->fails()) {
                return response()->json($validator->messages(), 419);
            }

            Expense::create([
                'user_id' => Auth::id(),
                'amount' => $request->input('amount'),
                'Buying Date' => $request->input('Date'),
                'category_id' => $request->input('category_id'),
            ]);
            return response()->json(['success' => 'success']);
        }

    }

    public function getExpenses()
    {
        $expenses = DB::table('expenses')
            ->leftJoin('categories', 'expenses.category_id', '=', 'categories.id')
            ->select('category', 'image', 'expenses.user_id', 'expenses.id', 'category_id', 'amount', 'Buying Date')
            ->where('expenses.user_id', Auth::id())
            ->paginate(6);
        return response()->json($expenses);
    }
    public function delete(Request $request)
    {
        $data = $request->json()->all();

        $validator = Validator::make($data, [
            'id' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {

            return response()->json($validator->messages(), 419);

        }

        $expense = Expense::where('id', $data['id'])->where('user_id', Auth::id())
            ->delete();
        if ($expense) {
            return response()->json(['success' => 'success']);
        } else {
            return response()->json(['Something went wrong']);
        }
    }

    public function edit(Request $request)
    {
        $data = $request->json()->all();

        $validator = Validator::make($data, [
            'id' => ['required', 'integer'],
            'amount' => ['string', 'required'],
            'Buying Date' => ['required', 'string'],
            'category_id' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {

            return response()->json($validator->messages(), 419);

        }

        $expense = Expense::where('id', $data['id'])->where('user_id', Auth::id())
            ->update(['amount' => $data['amount'], 'Buying Date' => $data['Buying Date'], 'category_id' => $data['category_id']]);

        if ($expense) {
            return response()->json(['success' => 'success']);
        } else {
            return response()->json('Something Went Wrong');
        }
    }
}
