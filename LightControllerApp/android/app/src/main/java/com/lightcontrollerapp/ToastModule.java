package com.lightcontrollerapp;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import androidx.annotation.Nullable;


public class ToastModule extends ReactContextBaseJavaModule {
    private static final String LENGTH_SHORT = "LENGTH_SHORT";
    private static final String LENGTH_LONG = "LENGTH_LONG";

    //constructor
    public ToastModule(ReactApplicationContext context){
        super(context);
    }
    @Override
    public String getName() {
        return "ToastModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(LENGTH_LONG,Toast.LENGTH_LONG);
        constants.put(LENGTH_SHORT,Toast.LENGTH_SHORT);
        return constants;
    }

    @ReactMethod
    public void showText(String massage, int duration){
        Toast.makeText(getReactApplicationContext(),massage,duration).show();
    }
}
