import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(radius: 36, child: Icon(Icons.person, size: 36)),
          SizedBox(height: 12),
          Text('Guest User', style: Theme.of(context).textTheme.headline6),
          SizedBox(height: 8),
          Text('Sign in features are available via the backend. This client uses REST APIs (no Firebase).'),
        ],
      ),
    );
  }
}
