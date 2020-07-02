@extends('layouts.app')

@section('content')
@error('email')
<span class="invalid-feedback" role="alert">
    <strong>{{ $message }}</strong>
</span>
@enderror
<div id='main' @error('email') data-emailError="{{$message}}" @enderror @error('password') data-passwordError="{{$message}}" @enderror>
</div>
<div class="container">
    <div  id='loginPage' class='row'></div>
</div>
@endsection
