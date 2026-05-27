import 'package:flutter/material.dart';
import '../widgets/bottom_nav.dart';
import 'cloud.dart';
import 'fiqh.dart';
import 'terms.dart';
import 'profile.dart';
import '../services/feature_service.dart';
import '../services/feature_api.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  static List<Widget> _pages(BuildContext context) => <Widget>[
        HomeContent(),
        CloudScreen(),
        FiqhScreen(),
        ProfileScreen(),
      ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Islamly')),
      body: _pages(context)[_selectedIndex],
      bottomNavigationBar: BottomNav(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      ),
    );
  }
}

class HomeContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: FutureBuilder<Map<String, dynamic>>(
        future: FeatureApi.fetchFeature(),
        builder: (context, snapshot) {
          String display;
          if (snapshot.connectionState == ConnectionState.waiting) {
            display = 'Loading feature network...';
          } else if (snapshot.hasError || snapshot.data == null) {
            final count = FeatureService.calculateCurrentFeatures();
            display = 'Current network (local): ${FeatureService.formatFeatureCount(count)}';
          } else {
            display = 'Current network: ${snapshot.data!['formatted'] ?? '—'}';
          }

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Welcome to Islamly', style: Theme.of(context).textTheme.headline5),
              SizedBox(height: 8),
              Text(display, style: TextStyle(fontStyle: FontStyle.italic)),
              SizedBox(height: 16),
              Card(
                child: ListTile(
                  title: Text('Explore Knowledge Nodes'),
                  subtitle: Text('Tap the tabs below to browse core sections.'),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
