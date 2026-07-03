Islamly Flutter multi-platform skeleton

This folder contains a starter Flutter app scaffold to port the Next.js frontend to Flutter (mobile + web).

Getting started:

1. Install Flutter: https://docs.flutter.dev/get-started/install
2. From this folder run:

```bash
flutter pub get
flutter run -d chrome   # for web
flutter run -d <device> # for mobile
```

Notes:
- This is a minimal skeleton. Run `flutter create .` inside the folder to generate full platform scaffolding if you want Android/iOS folders.
- This Flutter client does not include Firebase integration. It is intended to consume existing REST/GraphQL APIs from the primary backend (Next.js/FaaS). If you later decide to integrate Firebase, add the packages and platform config separately.
