import 'package:flutter/material.dart';
import 'screens/home.dart';

void main() {
  runApp(IslamlyApp());
}

class IslamlyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Islamly',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
      ),
      home: HomeScreen(),
    );
  }
}
