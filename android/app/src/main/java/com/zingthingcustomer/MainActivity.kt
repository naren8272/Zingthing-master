package com.zingthingcustomer

import android.os.Bundle
import android.os.Build
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.Manifest
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.graphics.Color
import android.media.RingtoneManager
import android.media.AudioAttributes


class MainActivity : ReactActivity() {

    companion object {
        const val PERMISSION_REQUEST_CODE = 1
    }

    override fun getMainComponentName(): String = "zingthingcustomer"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Request permissions if not already granted
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!checkPermission()) {
                requestPermission()
            }
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Create the NotificationChannel
            // val name = "General Notifications"
            // val descriptionText = "Notifications for general updates and information"
            // val importance = NotificationManager.IMPORTANCE_HIGH
            // val channel = NotificationChannel("zingthing-customer", name, importance).apply {
            //     description = descriptionText
            //     enableLights(true)
            //     lightColor = Color.BLUE
            //     enableVibration(true)
            //     setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION), AudioAttributes.Builder()
            //         .setUsage(AudioAttributes.USAGE_NOTIFICATION)
            //         .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
            //         .build())
            // }
            // // Register the channel with the system
            // val notificationManager: NotificationManager =
            //     getSystemService(NotificationManager::class.java)
            // notificationManager.createNotificationChannel(channel)
        }
    }

    private fun checkPermission(): Boolean {
        val result = ContextCompat.checkSelfPermission(applicationContext, Manifest.permission.WRITE_EXTERNAL_STORAGE)
        val result2 = ContextCompat.checkSelfPermission(applicationContext, Manifest.permission.READ_EXTERNAL_STORAGE)
        return result == PackageManager.PERMISSION_GRANTED && result2 == PackageManager.PERMISSION_GRANTED
    }

    private fun requestPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE),
            PERMISSION_REQUEST_CODE
        )
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            PERMISSION_REQUEST_CODE -> if (grantResults.isNotEmpty()) {
                val writeAccepted = grantResults[0] == PackageManager.PERMISSION_GRANTED
                val readAccepted = grantResults[1] == PackageManager.PERMISSION_GRANTED
                if (!writeAccepted || !readAccepted) {
                    // Permission Denied
                }
            }
        }
    }
}
