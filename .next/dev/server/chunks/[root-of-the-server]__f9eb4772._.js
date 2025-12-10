module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/frontend-ii/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createServerClient,
    "createServerClient",
    ()=>createServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createServerClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hqzjzjnzkggzrppudegv.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxemp6am56a2dnenJwcHVkZWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODYxNDcsImV4cCI6MjA4MDA2MjE0N30.vW6nKlrm6BwDbHLos-5dcwJFT31lMsHGLdD1XgMXOBY"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
;
}),
"[project]/frontend-ii/app/api/whatsapp/assignment/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const body = await request.json();
        const { chatId, chatName, assignToId, assignToName, assignedById, assignedByName } = body;
        if (!chatId || !assignToId || !assignToName) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "chatId, assignToId e assignToName são obrigatórios"
            }, {
                status: 400
            });
        }
        // Verifica se já existe uma atribuição ativa para este chat
        const { data: existingAssignment } = await supabase.from("chat_assignments").select("*").eq("chat_id", chatId).eq("status", "active").maybeSingle();
        // Se já existe, verifica se é o mesmo usuário
        if (existingAssignment) {
            // Se já está atribuído ao mesmo usuário, retorna sem fazer nada (não salva no histórico)
            if (existingAssignment.assigned_to_id === assignToId) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: `Este chat já está atribuído a ${assignToName}`,
                    alreadyAssigned: true
                });
            }
            // Se é um usuário diferente, atualiza
            const { error: updateError } = await supabase.from("chat_assignments").update({
                assigned_to_id: assignToId,
                assigned_to_name: assignToName,
                updated_at: new Date().toISOString()
            }).eq("id", existingAssignment.id);
            if (updateError) {
                console.error("[API] Erro ao atualizar atribuição:", updateError);
                return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: "Erro ao atualizar atribuição"
                }, {
                    status: 500
                });
            }
            // Registra no histórico
            try {
                const { error: historyError } = await supabase.from("chat_history").insert({
                    chat_id: chatId,
                    chat_name: chatName || chatId,
                    event_type: "assignment_transferred",
                    event_data: {
                        from_user_id: existingAssignment.assigned_to_id,
                        from_user_name: existingAssignment.assigned_to_name,
                        to_user_id: assignToId,
                        to_user_name: assignToName
                    },
                    performed_by_id: assignedById,
                    performed_by_name: assignedByName || "Sistema"
                });
                if (historyError) {
                    console.error("[API] Erro ao registrar histórico (assignment_transferred):", historyError);
                } else {
                    console.log("[API] Histórico registrado com sucesso (assignment_transferred)");
                }
            } catch (logError) {
                console.error("[API] Erro ao registrar histórico:", logError);
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: "Atribuição atualizada com sucesso"
            });
        }
        // Se não existe, cria nova
        const { error: insertError } = await supabase.from("chat_assignments").insert({
            chat_id: chatId,
            chat_name: chatName || chatId,
            assigned_to_id: assignToId,
            assigned_to_name: assignToName,
            assigned_by_id: assignedById,
            assigned_by_name: assignedByName || "Sistema",
            status: "active"
        });
        if (insertError) {
            console.error("[API] Erro ao criar atribuição:", insertError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Erro ao criar atribuição"
            }, {
                status: 500
            });
        }
        // Registra no histórico
        try {
            const { error: historyError } = await supabase.from("chat_history").insert({
                chat_id: chatId,
                chat_name: chatName || chatId,
                event_type: "assignment_created",
                event_data: {
                    user_id: assignToId,
                    user_name: assignToName
                },
                performed_by_id: assignedById,
                performed_by_name: assignedByName || "Sistema"
            });
            if (historyError) {
                console.error("[API] Erro ao registrar histórico (assignment_created):", historyError);
            } else {
                console.log("[API] Histórico registrado com sucesso (assignment_created)");
            }
        } catch (logError) {
            console.error("[API] Erro ao registrar histórico:", logError);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Atribuição criada com sucesso"
        });
    } catch (error) {
        console.error("[API] Erro ao processar atribuição:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro interno do servidor"
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const { searchParams } = new URL(request.url);
        const chatId = searchParams.get("chatId");
        if (!chatId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "chatId é obrigatório"
            }, {
                status: 400
            });
        }
        const { data: assignment, error } = await supabase.from("chat_assignments").select("*").eq("chat_id", chatId).eq("status", "active").maybeSingle();
        if (error) {
            console.error("[API] Erro ao buscar atribuição:", error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Erro ao buscar atribuição"
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            assignment: assignment || null
        });
    } catch (error) {
        console.error("[API] Erro ao buscar atribuição:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro interno do servidor"
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const userId = cookieStore.get("auth_user_id")?.value;
        const userName = cookieStore.get("auth_user_name")?.value;
        const body = await request.json();
        const { assignmentId, chatId } = body;
        if (!assignmentId && !chatId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "assignmentId ou chatId é obrigatório"
            }, {
                status: 400
            });
        }
        let activeAssignment = null;
        // Se assignmentId foi fornecido, busca por ID
        if (assignmentId) {
            const { data, error } = await supabase.from("chat_assignments").select("*").eq("id", assignmentId).maybeSingle();
            if (error) {
                console.error("[API] Erro ao buscar atribuição por ID:", error);
            }
            activeAssignment = data;
        } else if (chatId) {
            const { data, error } = await supabase.from("chat_assignments").select("*").eq("chat_id", chatId).eq("status", "active").maybeSingle();
            if (error) {
                console.error("[API] Erro ao buscar atribuição por chatId:", error);
            }
            activeAssignment = data;
        }
        if (!activeAssignment) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Atribuição não encontrada"
            }, {
                status: 404
            });
        }
        // Deleta o registro da tabela
        const { error: deleteError } = await supabase.from("chat_assignments").delete().eq("id", activeAssignment.id);
        if (deleteError) {
            console.error("[API] Erro ao deletar atribuição:", deleteError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Erro ao remover atribuição"
            }, {
                status: 500
            });
        }
        // Registra o log de auditoria (não bloqueia se falhar)
        try {
            // Histórico unificado
            await supabase.from("chat_history").insert({
                chat_id: activeAssignment.chat_id,
                chat_name: activeAssignment.chat_name,
                event_type: "assignment_removed",
                event_data: {
                    removed_user_id: activeAssignment.assigned_to_id,
                    removed_user_name: activeAssignment.assigned_to_name
                },
                performed_by_id: userId || activeAssignment.assigned_to_id,
                performed_by_name: userName || activeAssignment.assigned_to_name
            });
        } catch (logError) {
            console.error("[API] Erro ao registrar log:", logError);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Atribuição removida com sucesso"
        });
    } catch (error) {
        console.error("[API] Erro ao remover atribuição:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro interno do servidor"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f9eb4772._.js.map