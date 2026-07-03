class FeatureService {
  // Mirror of the JS feature-counter: BASE=17 Quadrillion, DAILY_INCREASE=10 Trillion
  static final DateTime launchDate = DateTime.utc(2025, 2, 1);
  static const int baseFeatures = 17000000000000000;
  static const int dailyIncrease = 10000000000000;

  static int calculateCurrentFeatures() {
    final now = DateTime.now().toUtc();
    final diff = now.difference(launchDate).inDays;
    final days = diff < 0 ? 0 : diff;
    return baseFeatures + (days * dailyIncrease);
  }

  static String formatFeatureCount(int count) {
    const quadrillion = 1000000000000000;
    const trillion = 1000000000000;
    const billion = 1000000000;
    if (count >= quadrillion) {
      final v = count / quadrillion;
      return "${v.toStringAsFixed(2)} Quadrillion";
    }
    if (count >= trillion) {
      final v = count / trillion;
      return "${v.toStringAsFixed(2)} Trillion";
    }
    if (count >= billion) {
      final v = count / billion;
      return "${v.toStringAsFixed(2)} Billion";
    }
    return count.toString();
  }
}
