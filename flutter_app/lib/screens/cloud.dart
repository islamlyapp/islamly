import 'package:flutter/material.dart';
import '../services/feature_service.dart';

class CloudScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final count = FeatureService.calculateCurrentFeatures();
    final formatted = FeatureService.formatFeatureCount(count);

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Scholarly Feature Network', style: Theme.of(context).textTheme.headline5),
          SizedBox(height: 8),
          Text('The $formatted Scholarly Feature Network.', style: TextStyle(fontStyle: FontStyle.italic)),
          SizedBox(height: 16),
          Card(
            child: ListTile(
              leading: Icon(Icons.cloud, size: 32),
              title: Text('Feature Nodes'),
              subtitle: Text('High-density compute nodes provisioned for large-scale indexing.'),
            ),
          ),
        ],
      ),
    );
  }
}
