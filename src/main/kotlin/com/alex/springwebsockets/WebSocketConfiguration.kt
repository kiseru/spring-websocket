package com.alex.springwebsockets

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean
import java.util.concurrent.TimeUnit

@Configuration
@EnableWebSocket
class WebSocketConfiguration : WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(echoHandler(), "/echo")
    }

    fun echoHandler() = EchoHandler()

    @Bean
    fun configureWebSocketContainer() = ServletServerContainerFactoryBean().apply {
        setMaxBinaryMessageBufferSize(16384)
        setMaxTextMessageBufferSize(16384)
        setMaxSessionIdleTimeout(TimeUnit.MINUTES.convert(30, TimeUnit.MILLISECONDS))
        setAsyncSendTimeout(TimeUnit.SECONDS.convert(5, TimeUnit.MILLISECONDS))
    }
}