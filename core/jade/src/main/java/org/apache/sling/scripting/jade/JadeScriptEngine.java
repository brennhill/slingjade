/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.sling.scripting.jade;

import java.io.Reader;

import javax.script.Bindings;
import javax.script.ScriptContext;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptException;
import javax.jcr.Node;

import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.apache.sling.scripting.api.AbstractSlingScriptEngine;

import de.neuland-bfi.jade4j.*;

/**
 * A ScriptEngine that uses <a href="http://jade-lang.com/">Jade</a> templates
 * to render a Resource in HTML.
 *
 * Uses https://github.com/neuland/jade4j jade engine.
 */
public class JadeScriptEngine extends AbstractSlingScriptEngine {
    private static final Logger log = Logger.getLogger(JadeScriptEngine.class.getName());

    private final Configuration configuration;

    public JadeScriptEngine(ScriptEngineFactory factory) {
        super(factory);
        configuration = new Configuration();
    }

    public Object eval(Reader reader, ScriptContext scriptContext)
            throws ScriptException {
        Bindings bindings = scriptContext.getBindings(ScriptContext.ENGINE_SCOPE);
        SlingScriptHelper helper = (SlingScriptHelper) bindings.get(SlingBindings.SLING);
        if (helper == null) {
            throw new ScriptException("SlingScriptHelper missing from bindings");
        }

        // ensure GET request
        if (!"GET".equals(helper.getRequest().getMethod())) {
            throw new ScriptException(
                "JADE templates only support GET requests");
        }

        String scriptName = helper.getScript().getScriptResource().getPath();

        try {
            Bindings bindings = ctx.getBindings(ScriptContext.ENGINE_SCOPE);
            //Add items to bindings to make things easier here.

            JadeTemplate template = Jade4J.getTemplate(scriptName);
            Jade4J.render(template, bindings, scriptContext.getWriter());

        } catch (Throwable t) {
            log.error("Failure running Jade script.", t);
            throw new ScriptException("Failure running Jade script "
                + scriptName);
        }

        return null;
    }

}