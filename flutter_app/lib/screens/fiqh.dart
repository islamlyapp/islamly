import 'package:flutter/material.dart';

class FiqhScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Fiqh Infrastructure', style: Theme.of(context).textTheme.headline5),
          SizedBox(height: 8),
          Text('The Fiqh Infrastructure provides rulings indexed across the scholarly features, citing evidences from the Quran and Sunnah.'),
          SizedBox(height: 16),
          Card(
            child: ListTile(
              leading: Icon(Icons.menu_book),
              title: Text('Rulings Index'),
              subtitle: Text('Search rulings, evidences and consensus opinions.'),
            ),
          ),
        ],
      ),
    );
  }
}
