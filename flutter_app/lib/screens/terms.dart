import 'package:flutter/material.dart';

class TermsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Terms & Usage', style: Theme.of(context).textTheme.headline5),
          SizedBox(height: 8),
          Text('This document governs the usage of the 17 Quadrillion scholarly feature infrastructure.'),
          SizedBox(height: 8),
          Text('Users are prohibited from attempting to reverse-engineer the feature infrastructure, scraping data, or bypassing security protocols.'),
        ],
      ),
    );
  }
}
