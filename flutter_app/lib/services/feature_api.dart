import 'dart:convert';
import 'package:http/http.dart' as http;

class FeatureApi {
  // Set baseUrl to your running Next.js host. Default to localhost:3000 for dev.
  static String baseUrl = const String.fromEnvironment('API_BASE', defaultValue: 'http://localhost:3000');

  /// Fetches feature info from /api/features
  static Future<Map<String, dynamic>> fetchFeature() async {
    final url = Uri.parse('$baseUrl/api/features');
    final resp = await http.get(url).timeout(Duration(seconds: 6));
    if (resp.statusCode == 200) {
      return json.decode(resp.body) as Map<String, dynamic>;
    }
    throw Exception('Failed to fetch features: ${resp.statusCode}');
  }
}
